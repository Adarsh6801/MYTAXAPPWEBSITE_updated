import { useEffect } from "react";

import MainBlogSection from "./MainBlogSection";
import ProfileFooter from "../../components/ProfileFooter";
import BlogList from "./BlogList";
import LandingNavbar from "../../components/LandingNavbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogs } from "../../redux/blogSlice";
import Loading from "../../components/Loading";
import { BlogTypeEnum } from "../../constants/blog";
import { getLandingUserType } from "../../helpers/storage";

const Blogs = () => {
  const dispatch = useAppDispatch();
  const { loading, blogs = [] } = useAppSelector(state => state.blog);
  const mainBlog = [...blogs].sort(
    (a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
  )[0];
  const restBlogs = blogs.filter(x => x.id !== mainBlog.id);

  useEffect(() => {
    const landingUserType = getLandingUserType();
    const typeEnum =
      landingUserType === "taxpayer"
        ? BlogTypeEnum.TaxPayer
        : BlogTypeEnum.Accountant;

    if (!blogs.any()) {
      dispatch(fetchBlogs(typeEnum));
    }
  }, []);

  return (
    <>
      <LandingNavbar />
      <MainBlogSection {...mainBlog} image={mainBlog?.image} />
      {restBlogs.length > 0 && <BlogList blogs={restBlogs} />}
      <ProfileFooter />
      {loading && <Loading type="primary" />}
    </>
  );
};

export default Blogs;
