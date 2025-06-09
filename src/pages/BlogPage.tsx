import React from "react";
import { useUser } from "../context/UserContext"; // Ajusta la ruta según tu estructura

const articles = [
	{
		id: 1,
		title: "Los secretos mejor guardados de Colombia",
		summary: "Descubre lugares mágicos y poco conocidos que te harán enamorarte aún más de nuestro país.",
		image: "/foto1.jpg",
		category: "Destinos",
	},
	{
		id: 2,
		title: "Cómo viajar seguro y barato por Colombia",
		summary: "Tips y consejos para que tu aventura sea inolvidable, económica y segura.",
		image: "/blog2.jpg",
		category: "Consejos",
	},
	{
		id: 3,
		title: "Gastronomía colombiana: sabores que conquistan",
		summary: "Un recorrido por los platos típicos y las experiencias culinarias que no te puedes perder.",
		image: "/blog3.jpg",
		category: "Gastronomía",
	},
];

const categories = ["Todos", "Destinos", "Consejos", "Gastronomía"];

const BlogPage = () => {
	const {} = useUser();
	const [selectedCategory, setSelectedCategory] = React.useState("Todos");

	const filteredArticles =
		selectedCategory === "Todos"
			? articles
			: articles.filter((a) => a.category === selectedCategory);

	return (
		<div className="min-h-screen bg-gradient-to-b from-ywhite-50 to-white pt-[110px]">
			{/* Hero */}
			<section
				className="relative py-16 px-4 text-center rounded-b-3xl shadow-lg mb-12 overflow-hidden bg-blue-700"
			>
				<div className="absolute inset-0 bg-blue-700 bg-opacity-80"></div>
				<div className="relative z-10">
					<h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white animate-fade-in">
						Bienvenido a nuestro Blog
					</h1>
					<p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto text-white animate-fade-in">
						Inspírate, aprende y descubre Colombia con historias, consejos y
						experiencias únicas.
					</p>
					<a
						href="#articulos"
						className="inline-block bg-yellow-300 text-red-800 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition-colors animate-bounce"
					>
						Explorar artículos
					</a>
				</div>
			</section>

			{/* Categorías */}
			<div className="flex justify-center gap-4 mb-10 flex-wrap">
				{categories.map((cat) => (
					<button
						key={cat}
						onClick={() => setSelectedCategory(cat)}
						className={`px-5 py-2 rounded-full font-semibold border-2 transition-colors ${
							selectedCategory === cat
								? "bg-red-700 text-white border-red-700"
								: "bg-white text-red-700 border-red-700 hover:bg-red-100"
						}`}
					>
						{cat}
					</button>
				))}
			</div>

			{/* Artículos */}
			<section
				id="articulos"
				className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
			>
				{filteredArticles.map((article) => (
					<div
						key={article.id}
						className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 group"
					>
						<img
							src={article.image}
							alt={article.title}
							className="w-full h-48 object-cover group-hover:brightness-90 transition-all"
						/>
						<div className="p-6">
							<span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-3 py-1 rounded-full mb-2">
								{article.category}
							</span>
							<h2 className="text-2xl font-bold mb-2">{article.title}</h2>
							<p className="text-gray-700 mb-4">{article.summary}</p>
							<button className="bg-red-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-800 transition-colors">
								Leer más
							</button>
						</div>
					</div>
				))}
			</section>

			{/* CTA final */}
			<div className="text-center mb-16">
				<h3 className="text-2xl font-bold mb-4">
					¿Quieres recibir lo mejor del blog en tu correo?
				</h3>
				<form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
					<input
						type="email"
						placeholder="Tu correo electrónico"
						className="px-4 py-2 rounded-full border-2 border-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-auto"
					/>
					<button
						type="submit"
						className="bg-red-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-800 transition-colors"
					>
						Suscribirme
					</button>
				</form>
			</div>
		</div>
	);
};

export default BlogPage;