import { Link } from "react-router-dom";

function PopularProjects({ projects }) {
  return (
    <>
      <h4 className="font-800 text-xl mb-10">Popular projects in your area</h4>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-10 gap-y-16">
        {projects?.length &&
          projects.map((project) => (
            <div className="shadow-md rounded-[5px] h-[110px] lg:h-full">
              <Link to="/">
                <div className="flex flex-row lg:!flex-col">
                  <img
                    className="rounded-l-[5px] lg:rounded-t-[5px] w-[110px] h-[110px] lg:h-full lg:w-full lg:aspect-video"
                    src={project.src}
                    alt="project"
                  />
                  <div className="block w-full pl-7">
                    <div className="flex flex-col justify-center items-start py-4 h-full">
                      <p className="text-[18px] lg:font-bold">{project.title}</p>
                      <div className="flex items-center">
                        <img
                          src="/assets/img/tag.png"
                          class="hidden lg:block w-5 h-5 mr-2"
                          alt="location"
                        />
                        <span className="inline-block mx-0 text-[18px] lg:text-[14px]">
                          Avg. Project: $52 – $122
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}

export default PopularProjects;






