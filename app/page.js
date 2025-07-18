'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogList from './Components/BlogList';

const initialBlogs = [
  {
    slug: 'attack-on-titan',
    title: "Attack on Titan",
    image: "/images/attack-on -titan.jpeg",
    summary: "Humanity's battle against the Titans unfolds in this brutal, emotional epic."
  },
  {
    slug: 'demon-slayer',
    title: "Demon Slayer",
    image: "/images/demon-slayer.jpeg",
    summary: "Tanjiro Kamado fights demons while seeking a cure for his sister."
  },
  {
    slug: 'jujutsu-kaisen',
    title: "Jujutsu Kaisen",
    image: "/images/jujutsu-kaisen.jpeg",
    summary: "Yuji Itadori joins a secret school to battle deadly curses and uncover dark truths."
  },
  {
    slug: 'my-hero-academia',
    title: "My Hero Academia",
    image: "/images/my-hero.jpeg",
    summary: "In a world of superpowers, Izuku Midoriya rises to become the number one hero."
  },
  {
    slug: 'tokyo-ghoul',
    title: "Tokyo Ghoul",
    image: "/images/tokyo-ghoul.jpeg",
    summary: "Ken Kaneki’s life changes forever when he becomes part human, part ghoul."
  },
  {
    slug: 'spy-x-family',
    title: "Spy x Family",
    image: "/images/spy-x-family.jpeg",
    summary: "A spy, assassin, and telepath form an unexpected and lovable family."
  },
  {
    slug: 'death-note',
    title: "Death Note",
    image: "/images/death-note.jpeg",
    summary: "Light Yagami wields a deadly notebook to purge the world of criminals."
  },
  {
    slug: 'your-name',
    title: "Your Name",
    image: "/images/your-name.jpeg",
    summary: "Two strangers mysteriously connected by time and space seek each other out."
  },
  {
    slug: 'one-piece',
    title: "One Piece",
    image: "/images/one-piece.jpeg",
    summary: "Luffy sets sail with his crew in search of the ultimate treasure — the One Piece."
  },
  {
    slug: 'chainsaw-man',
    title: "Chainsaw Man",
    image: "/images/chainsaw-man.jpeg",
    summary: "Denji, with a chainsaw heart, fights devils in this bloody, wild ride."
  },
  {
    slug: 'naruto-shippuden',
    title: "Naruto Shippuden",
    image: "/images/naruto.jpeg",
    summary: "Naruto’s journey from an outcast ninja to Hokage is filled with bonds and battles."
  },
  {
    slug: 'fullmetal-alchemist',
    title: "Fullmetal Alchemist: Brotherhood",
    image: "/images/fullmetal.jpeg",
    summary: "Two brothers face the consequences of forbidden alchemy in a journey for redemption."
  }
];

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [blogs, setBlogs] = useState(initialBlogs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    slug: '',
    image: '',
    summary: ''
  });

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      localStorage.setItem('blogs', JSON.stringify(initialBlogs));
    }

    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setIsLoggedIn(true);
      setUserType(user);
    }
  }, []);

  const handleLogin = () => {
    router.push('/Login');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setUserType('');
    setSelectedMovies([]);
    setShowAddForm(false);
  };

  const handleAddMovie = () => {
    setShowAddForm(true);
  };

  const handleDeleteMovies = () => {
    if (selectedMovies.length === 0) {
      alert('Please select at least one anime to delete');
      return;
    }

    const updatedBlogs = blogs.filter(blog => !selectedMovies.includes(blog.slug));
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setSelectedMovies([]);
  };

  const handleMovieSelect = (slug) => {
    setSelectedMovies(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitMovie = (e) => {
    e.preventDefault();

    if (!newMovie.title || !newMovie.slug || !newMovie.image || !newMovie.summary) {
      alert('Please fill in all fields');
      return;
    }

    const slugExists = blogs.some(blog => blog.slug === newMovie.slug);
    if (slugExists) {
      alert('An anime with this slug already exists');
      return;
    }

    const updatedBlogs = [...blogs, newMovie];
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setNewMovie({
      title: '',
      slug: '',
      image: '',
      summary: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-buttons">
          {isLoggedIn ? (
            <button className="nav-button logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <div className="log-buttons">
              <button className="nav-button" onClick={() => handleLogin('admin')}>Admin Login</button>
              <button className="nav-button" onClick={() => handleLogin('user')}>User Login</button>
            </div>
          )}
        </div>

        <h1>Anime Blog Showcase</h1>
        <p>Explore iconic anime series, emotional journeys, and unforgettable characters.</p>
      </div>

      {isLoggedIn && (
        <div className="movie-controls">
          <button className="control-button add-movie" onClick={handleAddMovie}>
            <span>+</span> Add New Anime
          </button>
          <button className="control-button delete-movie" onClick={handleDeleteMovies}>
            <span>🗑️</span> Delete Selected
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="movie-form">
          <h2>Add New Anime</h2>
          <form onSubmit={handleSubmitMovie}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newMovie.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Slug (URL identifier):</label>
              <input
                type="text"
                name="slug"
                value={newMovie.slug}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={newMovie.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Summary:</label>
              <textarea
                name="summary"
                value={newMovie.summary}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="nav-button logout-button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="nav-button">
                Save Anime
              </button>
            </div>
          </form>
        </div>
      )}

      <BlogList
        blogs={blogs}
        isLoggedIn={isLoggedIn}
        selectedMovies={selectedMovies}
        onMovieSelect={handleMovieSelect}
      />
    </div>
  );
}
