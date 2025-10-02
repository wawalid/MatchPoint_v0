import { useState } from "react";

function HomePage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "manu123",
      avatar: "https://i.pravatar.cc/40?img=1",
      content: "Acabo de crear un grupo para jugar al fútbol los sábados. ¡Únete!",
      image: "",
      date: "Hace 2 horas",
    },
    {
      id: 2,
      username: "raquel_fit",
      avatar: "https://i.pravatar.cc/40?img=2",
      content: "¡Gran partido de baloncesto hoy en el parque central!",
      image: "https://source.unsplash.com/400x200/?basketball",
      date: "Hace 3 horas",
    },
    {
      id: 3,
      username: "tennis_pro",
      avatar: "https://i.pravatar.cc/40?img=3",
      content: "Busco compañero para jugar pádel mañana por la tarde.",
      image: "",
      date: "Hace 5 horas",
    },
  ]);

  const [newPost, setNewPost] = useState({
    content: "",
    image: "",
  });

  const handlePostSubmit = () => {
    if (!newPost.content && !newPost.image) return;

    const post = {
      id: posts.length + 1,
      username: "usuario_demo",
      avatar: "https://i.pravatar.cc/40",
      content: newPost.content,
      image: newPost.image,
      date: "Ahora",
    };

    setPosts([post, ...posts]);
    setNewPost({ content: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      
      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Crear Post */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <textarea
            className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="¿Qué quieres compartir?"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <input
            type="text"
            className="w-full border rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="URL de imagen (opcional)"
            value={newPost.image}
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
          />
          <button
            className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600"
            onClick={handlePostSubmit}
          >
            Publicar
          </button>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow p-5 flex flex-col"
            >
              <div className="flex items-center mb-3">
                <img
                  src={post.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{post.username}</p>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </div>
              <p className="mb-3">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="rounded-lg max-h-80 object-cover"
                />
              )}
              <div className="flex mt-3 gap-4 text-sm text-gray-500">
                <button>👍 Me gusta</button>
                <button>💬 Comentar</button>
                <button>🔁 Compartir</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MatchPoint. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default HomePage;
