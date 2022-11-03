import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handelLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handelGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {

    this.setState({ sortColumn });
  };

  resetBtn = () => {
    this.setState({ movies: getMovies() });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies } = this.state;

    if (count === 0)
      return (
        <p className=" d-flex justify-content-center mt-5 text-black-50 font-weight-bold">
          There is no Movies in database
        </p>
      );

    const filtered =
      selectedGenre && selectedGenre._id ? allMovies.filter((m) => m.genre._id === selectedGenre._id) : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row  ">
          <div
            className="col-3 m-1
          "
          >
            <ListGroup
              selectedItem={this.state.selectedGenre}
              items={this.state.genres}
              onItemSelect={this.handelGenreSelect}
            />
          </div>
          <div className="col">
            <p className="d-flex justify-content-center mt-2">Showing {filtered.length} Movies in the database</p>
            <div className="d-flex justify-content-center">
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handelLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center ">
              <button
                onClick={this.resetBtn}
                className="btn btn-info btn-sm mr-2"
              >
                Reset
              </button>
              <Pagination
                itemsCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
