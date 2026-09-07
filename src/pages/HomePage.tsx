import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { useLoginStore } from "@/stores/useLogin";
import type { Blog } from "@/types/blogs";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function HomePage() {
  const [Blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, logout } = useLoginStore();

  const getBlogs = async () => {
    try {
      const { data } = await axiosInstance.get<Blog[]>("/data/Blogs");
      setBlogs(data);
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div>
      <div className="flex justify-center items-center h-24">
        {user ? (
          <div>
            <h1>Welcome,{user.name}</h1>

            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-100">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-row gap-16 justify-center items-center">
          {Blogs.map((blog) => {
            return (
              <div key={blog.objectId} className="border-2 border-black p-8 ">
                <p className="text-lg font-bold">{blog.title}</p>
                <p>{blog.description}</p>
                <p>{blog.author}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default HomePage;
