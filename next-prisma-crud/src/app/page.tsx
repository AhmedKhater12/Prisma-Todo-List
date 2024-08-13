"use client";

import { useState, useEffect } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./Actions/users";
interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUsers() {
      const users = await fetchUsers();
      setUsers(users);
    }

    loadUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Both name and email are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const namePattern = /^[A-Za-z\s]+$/;

    if (!namePattern.test(name)) {
      alert("Please enter a valid name (letters and spaces only)");
      return;
    }

    if (name.length > 30) {
      alert("Name cannot be longer than 30 characters");
      return;
    }

    if (email.length > 40) {
      alert("Email cannot be longer than 40 characters");
      return;
    }

    try {
      const newUser = await createUser(name, email);

      setUsers([...users, newUser]);
      setName("");
      setEmail("");
    } catch (error) {
      alert("Error creating user");
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      const updatedUser = await updateUser(editingUser.id, name, email);

      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      alert("User updated successfully.");
      setName("");
      setEmail("");
      setEditingUser(null);
    } catch (error) {
      alert("Error updating user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Error deleting user");
    }
  };

  const handleEditUser = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setEditingUser(user);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-7 text-center text-gray-800">
        Data For Users
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md "
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-r-md "
          />
        </div>

        {editingUser ? (
          <button
            onClick={handleUpdateUser}
            className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-500"
          >
            Update User
          </button>
        ) : (
          <button
            onClick={handleCreateUser}
            className="w-full bg-sky-700 text-white p-2 rounded-md hover:bg-sky-900 transition duration-500"
          >
            Create User
          </button>
        )}
      </div>

      <ul className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 border-b border-gray-400"
          >
            <span className="font-medium text-gray-700">{user.name}</span>

            <span className="text-gray-500">({user.email})</span>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEditUser(user)}
                className="bg-slate-700 text-white p-2 rounded-md hover:bg-slate-900 transition duration-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 transition duration-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
