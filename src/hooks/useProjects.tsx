import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink: string;
  githubLink?: string;
}

function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"fetchFailed" | "connectFailed" | null>(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "projects"), orderBy("title", "asc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const projectList: Project[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          })) as Project[];
          setProjects(projectList);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching projects:", err);
          setError("fetchFailed");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error initializing snapshot:", err);
      setError("connectFailed");
      setLoading(false);
    }
  }, []);
  return { projects, loading, error };
}

export default useProjects;
