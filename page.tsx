import Navbar from "@/components/Navbar/Navbar";
import PostCard from "@/components/PostCard/PostCard";
import { blogPosts } from "@/data";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.title}>Stories & Insights</h1>
          <p className={styles.subtitle}>
            Discover the latest thoughts on technology, design, and sustainable development.
          </p>
          <button className="btn btn-primary">Subscribe for Updates</button>
        </div>
      </section>

      <div className="container">
        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
