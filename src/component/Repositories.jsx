import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Repos = () => {
  const [repo, setRepo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 1;
  const pagesVisited = pageNumber * usersPerPage;

  const getRepos = () => {
    axios
      .get("https://api.github.com/users/angie-code/repos")
      .then((response) => {
        const myRepo = response.data;
        setRepo(myRepo) || setLoading(false);
      });
  };

  useEffect(() => {
    getRepos();
  }, []);

  const displayRepo = repo
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((repoItem) => {
      const { id, name, owner } = repoItem;
      return (
        <div className="flex justify-center mt-5" key={id}>
          <div className="h-96 carousel carousel-vertical rounded-box relative">
            <div className="carousel-item h-full">
              <Link to={`/repositories/repodetails/${id}`}>
                <h1 className="absolute inset-x-0 bottom-0 text-center">
                  Name: {name}
                </h1>
              </Link>
              <img className="object-cover" src={owner.avatar_url} alt={name} />
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(repo.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {loading && <h1 className="text-center text-5xl mb-5">Repositories</h1>}
      {displayRepo}

      <ReactPaginate
        className="flex bg-black text-[1xl] rounded  
         w-fit p-4"
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBtn"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"disabled"}
        activeClassName={"activeBtn"}
      />
    </div>
  );
};

export default Repos;
