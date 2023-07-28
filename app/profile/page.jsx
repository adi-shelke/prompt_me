"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setposts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = () => {};
  const handleDelete = async () => {};
  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
