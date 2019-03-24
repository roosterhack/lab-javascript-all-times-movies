/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes
function turnHoursToMinutes(arr) {
  return arr.map(movie => {
    let hours = 0;
    let mins = 0;
    //Split the duration string into 2 arrays
    let splited = movie.duration.split(" ");

    if (splited.length === 2) {
      hours += parseInt(splited[0]);
      mins += parseInt(splited[1]);
    } else if (splited[0].includes("h")) {
      hours += parseInt(splited[0]);
    } else if (splited[0].includes("min")) {
      mins += parseInt(splited[0]);
    }
    //return the new obj arrays
    return {
      title: movie.title,
      year: movie.year,
      director: movie.director,
      duration: hours * 60 + mins,
      genre: movie.genre,
      rate: movie.rate
    };
  });
}
//console.table(turnHoursToMinutes(movies));

// Get the average of all rates with 2 decimals
function ratesAverage(arr) {
  let totalRating = arr.reduce((acc, movie) => Number(movie.rate) + acc, 0);
  return parseFloat((totalRating / arr.length).toFixed(2));
}
//console.log(`The average movie rating is ${ratesAverage(movies)}`);

// Get the average of Drama Movies
function dramaMoviesRate(arr) {
  let dramaMovies = arr.filter(movie => movie.genre.includes("Drama"));
  let averageRate = ratesAverage(dramaMovies);

  if (dramaMovies.length === 0) {
    return undefined;
  } else if (dramaMovies.some(movie => movie.rate === "")) {
    return averageRate;
  }
  return averageRate;
}

//console.log(`Drama movies average rating is ${dramaMoviesRate(movies)}`);

// Order by time duration, in growing order
function orderByDuration(arr) {
  let coverted = turnHoursToMinutes(arr);
  let sorted = coverted.sort((a, b) => {
    if (a.duration === b.duration) {
      return b.title.localeCompare(a.title);
    } else if (a.duration < b.duration) {
      return -1;
    }
    return 1;
  });
  return sorted;
}
//console.table(orderByDuration(movies));

// How many movies did STEVEN SPIELBERG
function howManyMovies(arr) {
  const dramaMovies = arr.filter(movie => movie.genre.includes("Drama"));
  const stevesMovie = dramaMovies.filter(movie => movie.director.includes("Steven Spielberg"));
  if (arr.length === 0) {
    return undefined;
  } else if (stevesMovie.length === 0) {
    return `Steven Spielberg directed 0 drama movies!`;
  } else if (stevesMovie.length === 1) {
    return `Steven Spielberg directed only 1 drama movies!`;
  }
  return `Steven Spielberg directed ${stevesMovie.length} drama movies!`;
}
//console.log(howManyMovies(movies));

// Order by title and print the first 20 titles
function orderAlphabetically(arr) {
  let sorted = arr.sort((a, b) => {
    let titleA = a.title.toLowerCase();
    let titleB = b.title.toLowerCase();
    if (titleA < titleB) {
      return -1;
    } else if (titleA > titleB) {
      return 1;
    }
    return 0;
  });
  if (sorted.length < 20) {
    return sorted.slice(0, 20).map(movie => movie.title);
  } else if (sorted.length > 20) {
    return sorted.slice(0, 20).map(movie => movie.title);
  }
}

//console.table(orderAlphabetically(movies));
// Best yearly rate average
function bestYearlyAverage(arr) {
  // Group each year's movie and push them to diffrent arrays
  let sorted = arr.reduce((a, m) => {
    a[m.year] = (a[m.year] || []).concat(m);
    return a;
  }, {});

  const entries = Object.entries(sorted);

  const yearRate = entries.map(year => {
    return {
      year: year[0],
      averageRate: ratesAverage(year[1])
    };
  });

  const bestYear = yearRate.sort((a, b) => {
    if (a.averageRate < b.averageRate) {
      return -1;
    } else if (a.averageRate > b.averageRate) {
      return 1;
    }
    return 0;
  });

  if (arr.length === 0) {
    return undefined;
  }

  return `The year which has the best average is ${bestYear[bestYear.length - 1].year} and the average rating is ${
    bestYear[bestYear.length - 1].averageRate
  }`;
  // find the averge rating for each year group
}
console.log(bestYearlyAverage(movies));
