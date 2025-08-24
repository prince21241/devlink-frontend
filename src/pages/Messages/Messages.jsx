import React, { useEffect, useMemo, useRef, useState } from "react";
import API from "../../api/axios";
import { getAvatarWithInitials } from "../../utils/defaultAvatar";

export default function Messages() {
	const [conversations, setConversations] = useState([]);
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [loadingConversations, setLoadingConversations] = useState(true);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [userQuery, setUserQuery] = useState("");
	const [userResults, setUserResults] = useState([]);
	const [searchingUsers, setSearchingUsers] = useState(false);
	const bottomRef = useRef(null);

	useEffect(() => {
		const loadConversations = async () => {
			try {
				setLoadingConversations(true);
				const res = await API.get("/api/messages/conversations");
				setConversations(res.data);
			} catch (e) {
				console.error("Failed to load conversations", e);
			} finally {
				setLoadingConversations(false);
			}
		};
		loadConversations();
	}, []);

	// Search users to start new conversation
	useEffect(() => {
		if (!userQuery || userQuery.trim().length < 2) {
			setUserResults([]);
			return;
		}
		const controller = new AbortController();
		const t = setTimeout(async () => {
			try {
				setSearchingUsers(true);
				const res = await API.get(`/api/search/users?q=${encodeURIComponent(userQuery.trim())}`, {
					signal: controller.signal,
				});
				setUserResults(res.data);
			} catch (e) {
				if (e.name !== "CanceledError") console.error("User search failed", e);
			} finally {
				setSearchingUsers(false);
			}
		}, 300);
		return () => {
			controller.abort();
			clearTimeout(t);
		};
	}, [userQuery]);

	useEffect(() => {
		if (!selectedConversation?._id) return;
		const loadMessages = async () => {
			try {
				setLoadingMessages(true);
				const res = await API.get(`/api/messages/conversations/${selectedConversation._id}/messages`);
				setMessages(res.data);
			} catch (e) {
				console.error("Failed to load messages", e);
			} finally {
				setLoadingMessages(false);
			}
		};
		loadMessages();
	}, [selectedConversation?._id]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="bg-white rounded-lg shadow overflow-hidden h-[70vh] flex">
			{/* Conversation list */}
			<aside className="w-64 border-r p-4 hidden sm:block">
				<h2 className="text-lg font-semibold mb-3">Messages</h2>
				<div className="mb-3">
					<input
						type="text"
						placeholder="Search users to message..."
						value={userQuery}
						onChange={(e) => setUserQuery(e.target.value)}
						className="w-full border rounded px-3 py-2"
					/>
				</div>
				{userQuery && (
					<div className="mb-4 max-h-56 overflow-y-auto space-y-2">
						{searchingUsers && <div className="text-gray-500">Searching...</div>}
						{!searchingUsers && userResults.length === 0 && (
							<div className="text-gray-500">No users found.</div>
						)}
						{userResults.map((u) => (
							<div key={u._id} className="flex items-center justify-between p-2 border rounded">
								<div className="flex items-center gap-2">
									<img
										src={getAvatarWithInitials(u.name, u.profilePicture)}
										alt={u.name}
										className="w-8 h-8 rounded-full object-cover"
									/>
									<div>
										<div className="text-sm font-medium">{u.name}</div>
										<div className="text-xs text-gray-500">{u.email}</div>
									</div>
								</div>
								<button
									onClick={async () => {
										try {
											const res = await API.post("/api/messages/conversations", { userId: u._id });
											const created = res.data;
											const convObj = {
												...created,
												otherUser: {
													_id: u._id,
													name: u.name,
													email: u.email,
													profilePicture: u.profilePicture || null,
												},
											};
											setConversations((prev) => {
												const exists = prev.some((c) => c._id === convObj._id);
												return exists ? prev : [convObj, ...prev];
											});
											setSelectedConversation(convObj);
											setUserQuery("");
											setUserResults([]);
										} catch (e) {
											console.error("Failed to create conversation", e);
										}
									}}
									className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
								>
									Message
								</button>
							</div>
						))}
					</div>
				)}
				<div className="space-y-2">
					{loadingConversations && <div className="text-gray-500">Loading...</div>}
					{!loadingConversations && conversations.length === 0 && (
						<div className="text-gray-500">No conversations yet.</div>
					)}
					{conversations.map((c) => (
						<button
							key={c._id}
							onClick={() => setSelectedConversation(c)}
							className={`w-full text-left p-3 rounded hover:bg-gray-100 transition ${
								selectedConversation?._id === c._id ? "bg-blue-50" : ""
							}`}
						>
							<div className="flex items-center gap-3">
								<img
									src={getAvatarWithInitials(c.otherUser?.name, c.otherUser?.profilePicture)}
									alt={c.otherUser?.name}
									className="w-10 h-10 rounded-full object-cover border"
								/>
								<div>
									<div className="font-medium">{c.otherUser?.name || "Unknown"}</div>
									<div className="text-sm text-gray-500 truncate">{c.lastMessage || "Start chatting"}</div>
								</div>
							</div>
						</button>
					))}
				</div>
			</aside>

			{/* Message thread */}
			<section className="flex-1 flex flex-col">
				<div className="p-4 border-b font-semibold">
					{selectedConversation ? selectedConversation.name : "Select a conversation"}
				</div>
				<div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
					{!selectedConversation && <div className="text-gray-500">No conversation selected.</div>}
					{selectedConversation && loadingMessages && <div className="text-gray-500">Loading messages...</div>}
					{selectedConversation && !loadingMessages && messages.map((m) => (
						<div
							key={m._id}
							className={`max-w-xs p-3 rounded-lg ${
								m.sender === selectedConversation.otherUser?._id
									? "bg-white border"
									: "ml-auto bg-blue-600 text-white"
							}`}
						>
							{m.text}
						</div>
					))}
					<div ref={bottomRef} />
				</div>
				<div className="p-3 border-t flex gap-2">
					<input
						type="text"
						placeholder={selectedConversation ? "Type a message" : "Select a conversation to start"}
						className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={async (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								if (!selectedConversation || !input.trim()) return;
								try {
									const res = await API.post("/api/messages/messages", {
										recipientId: selectedConversation.otherUser?._id,
										text: input.trim(),
									});
									setMessages((prev) => [...prev, res.data]);
									setInput("");
								} catch (e) {
									console.error("Failed to send message", e);
								}
							}
						}}
						disabled={!selectedConversation}
					/>
					<button
						onClick={async () => {
							if (!selectedConversation || !input.trim()) return;
							try {
								const res = await API.post("/api/messages/messages", {
									recipientId: selectedConversation.otherUser?._id,
									text: input.trim(),
								});
								setMessages((prev) => [...prev, res.data]);
								setInput("");
							} catch (e) {
								console.error("Failed to send message", e);
							}
						}}
						className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
						disabled={!selectedConversation}
					>
						Send
					</button>
				</div>
			</section>
		</div>
	);
}


