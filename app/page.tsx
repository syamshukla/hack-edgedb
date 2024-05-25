// import Link from "next/link";
// import { createClient } from "edgedb";
// import e from "@/dbschema/edgeql-js";

// const client = createClient();

// export default async function Home() {
//   const selectPosts = e.select(e.BlogPost, () => ({
//     id: true,
//     title: true,
//     content: true,
//   }));
//   const posts = await selectPosts.run(client);
//   console.log("POSTS", posts);
//   return (
//     <div className="container mx-auto p-4 bg-black text-white">
//       <h1 className="text-3xl font-bold mb-4">Posts</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id} className="mb-4">
//             <Link href={`/post/${post.id}`} className="text-blue-500">
//               {post.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import client from "@/lib/edgedb";


export default function HomePage() {
  const [schemas, setSchemas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const fetchedSchemas = await client.query(`
          SELECT Schema {
            id,
            text
          }
        `);
        // @ts-ignore
        setSchemas(fetchedSchemas);
      } catch (error) {
        console.error("Error fetching schemas:", error);
      }
    };

    fetchSchemas();
  }, []);
  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.query(
        `
        INSERT Schema {
          text := <str>$text,
          submitter := (
            SELECT User FILTER .username = <str>$username LIMIT 1
          )
        }
      `,
        { text, username }
      );

      setText("");
      setUsername("");
      alert("Schema submitted!");
    } catch (error) {
      console.error("Error submitting schema:", error);
    }
  };

  const handleSwipe = async (direction: string) => {
    if (currentIndex >= schemas.length) return;

    const schema = schemas[currentIndex];
    const roastText = prompt("Enter your roast/compliment:");

    if (roastText) {
      await client.query(
        `
        INSERT Roast {
          text := <str>$roastText,
          schema := (SELECT Schema FILTER .id = <uuid>$schemaId),
          direction := <str>$direction
        }
      `,
        // @ts-ignore
        { roastText, schemaId: schema.id, direction }
      );

      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <h1>Roast My Schema</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your schema"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username (optional)"
        />
        <button type="submit">Submit Schema</button>
      </form>
      {currentIndex < schemas.length ? (
        <div>
          {/* @ts-ignore */}
          <div>{schemas[currentIndex].text}</div>
          <button onClick={() => handleSwipe("roast")}>Roast</button>
          <button onClick={() => handleSwipe("compliment")}>Compliment</button>
        </div>
      ) : (
        <div>No more schemas to swipe!</div>
      )}
    </div>
  );
}
