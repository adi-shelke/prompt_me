"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
const ProfilePage = () => {
  const router = useRouter();
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

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are your sure, you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setposts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
