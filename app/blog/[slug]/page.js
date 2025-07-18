'use client';
import { notFound } from 'next/navigation';
// No need for useState if data is static and not changing

const blogs = [
  {
    slug: 'attack-on-titan',
    title: "⚔️ Attack on Titan",
    image: "/images/attack-on-titan.jpg",
    content: "Humanity fights for survival against giant humanoid creatures. Packed with action, twists, and deep lore."
  },
  {
    slug: 'demon-slayer',
    title: "🔥 Demon Slayer",
    image: "/images/demon-slayer.jpg",
    content: "Tanjiro Kamado battles demons to save his sister. Stunning animation and emotional storytelling."
  },
  {
    slug: 'my-hero-academia',
    title: "💥 My Hero Academia",
    image: "/images/my-hero.jpg",
    content: "Follow Izuku Midoriya's journey to becoming the greatest hero in a world full of Quirks."
  },
  {
    slug: 'naruto-shippuden',
    title: "🍥 Naruto Shippuden",
    image: "/images/naruto.jpg",
    content: "Ninja action and emotional growth in a journey of friendship, rivalry, and destiny."
  },
  {
    slug: 'spy-x-family',
    title: "🕵️‍♂️ Spy x Family",
    image: "/images/spy-x-family.jpg",
    content: "A spy, an assassin, and a telepath form a fake family in this witty and wholesome action-comedy."
  },
  {
    slug: 'death-note',
    title: "📓 Death Note",
    image: "/images/death-note.jpg",
    content: "A genius student discovers a deadly notebook. A psychological battle between justice and power."
  },
  {
    slug: 'jujutsu-kaisen',
    title: "👊 Jujutsu Kaisen",
    image: "/images/jujutsu-kaisen.jpg",
    content: "Sorcerers fight cursed spirits in fast-paced action scenes mixed with dark humor."
  },
  {
    slug: 'fullmetal-alchemist',
    title: "⚙️ Fullmetal Alchemist: Brotherhood",
    image: "/images/fullmetal.jpg",
    content: "Two brothers seek the Philosopher's Stone in a story of alchemy, sacrifice, and redemption."
  },
  {
    slug: 'one-piece',
    title: "🏴‍☠️ One Piece",
    image: "/images/one-piece.jpg",
    content: "Join Luffy and his crew on a grand voyage to find the ultimate treasure and become Pirate King!"
  },
  {
    slug: 'your-name',
    title: "💫 Your Name",
    image: "/images/your-name.jpg",
    content: "Two teens mysteriously swap bodies in this romantic, time-bending masterpiece by Makoto Shinkai."
  },
  {
    slug: 'tokyo-ghoul',
    title: "🩸 Tokyo Ghoul",
    image: "/images/tokyo-ghoul.jpg",
    content: "In a world of ghouls and humans, Kaneki struggles with his identity and survival."
  },
  {
    slug: 'chainsaw-man',
    title: "🪚 Chainsaw Man",
    image: "/images/chainsaw-man.jpg",
    content: "Devils, chaos, and a wild protagonist with a chainsaw head—violent, strange, and compelling."
  }
];

export default function BlogDetails() {
  // Hardcoding a slug. This page will now ALWAYS show the Attack on Titan blog.
  const hardcodedSlug = 'attack-on-titan'; 

  const blog = blogs.find(b => b.slug === hardcodedSlug);

  // If the hardcoded blog is not found (which shouldn't happen with the current data), 
  // render the notFound page immediately.
  if (!blog) {
    notFound();
  }

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
      <p>{blog.content || blog.summary}</p>
    </div>
  );
}