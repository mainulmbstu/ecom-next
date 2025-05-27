export const metadata = {
  title: "about",
  description: "about page",
};

const About = async () => {
  let mmm = async () => {
    "use server";
    console.log(22222222222);
  };
  return (
    <div className="">
      <h2>About</h2>
      <form action={mmm}>
        <button className="btn">test</button>
      </form>
    </div>
  );
};

export default About;
