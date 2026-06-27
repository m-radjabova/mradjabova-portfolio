import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

type FirestoreTimestampLike = {
  seconds: number;
  nanoseconds: number;
};

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink: string;
  githubLink?: string;
  createdAt?: FirestoreTimestampLike;
}

function getTimestampValue(timestamp?: FirestoreTimestampLike) {
  if (!timestamp) return 0;
  return timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1_000_000);
}

function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"fetchFailed" | "connectFailed" | null>(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "projects"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const projectList: Project[] = snapshot.docs
            .map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            }) as Project)
            .sort((a, b) => getTimestampValue(b.createdAt) - getTimestampValue(a.createdAt));
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
