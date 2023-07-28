"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setpost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPrompt();
  }, [promptId]);

  const UpdatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setpost}
      submitting={submitting}
      handleSubmit={UpdatePrompt}
    />
  );
};

export default UpdatePrompt;
