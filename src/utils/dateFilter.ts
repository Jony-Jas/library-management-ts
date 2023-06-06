const filterDate = document.querySelector("#filter-date")! as HTMLDivElement;

interface booksInterface {
  BookID: number;
  image: string;
  Title: string;
  Author: string;
  Subject: string;
  Year: string;
}

export function displayDate() {
  if (filterDate.innerHTML === "") {
    let option = document.createElement("input");
    option.type = "checkbox";
    option.value = "< 1900";
    option.name = "< 1900";
    let label = document.createElement("label");
    label.innerText = "< 1900";
    label.setAttribute("for", "< 1900");

    filterDate.appendChild(option);
    filterDate.appendChild(label);
    filterDate.appendChild(document.createElement("br"));

    option = document.createElement("input");
    option.type = "checkbox";
    option.value = "1900 - 2000";
    option.name = "1900 - 2000";
    label = document.createElement("label");
    label.innerText = "1900 - 2000";
    label.setAttribute("for", "1900 - 2000");

    filterDate.appendChild(option);
    filterDate.appendChild(label);
    filterDate.appendChild(document.createElement("br"));

    option = document.createElement("input");
    option.type = "checkbox";
    option.value = "> 2000";
    option.name = "> 2000";
    label = document.createElement("label");
    label.innerText = "> 2000";
    label.setAttribute("for", "> 2000");

    filterDate.appendChild(option);
    filterDate.appendChild(label);
    filterDate.appendChild(document.createElement("br"));
  }
}

export function filterByDate(
  filterdData: booksInterface[],
  books: booksInterface[]
): [number, booksInterface[]] {
  const dates: string[] = [];
  let dateCount = 0;
  for (let i = 0; i < filterDate.children.length; i++) {
    const element = filterDate.children[i] as HTMLInputElement;

    if (element.checked) {
      dates.push(element.value);
      dateCount++;
    }
  }

  if (dateCount !== 0) {
    if (filterdData.length === 0) {
      for (let i = 0; i < dates.length; i++) {
        const tempData = books.filter((book) => {
          const year = parseInt(book.Year.substring(0, 4));
          if (dates[i] === "< 1900") {
            return year < 1900;
          } else if (dates[i] === "1900 - 2000") {
            return year >= 1900 && year <= 2000;
          } else if (dates[i] === "> 2000") {
            return year > 2000;
          }
        });
        filterdData = tempData;
      }
    } else {
      for (let i = 0; i < dates.length; i++) {
        const tempData = filterdData.filter((book) => {
          const year = parseInt(book.Year.substring(0, 4));
          if (dates[i] === "< 1900") {
            return year < 1900;
          } else if (dates[i] === "1900 - 2000") {
            return year >= 1900 && year <= 2000;
          } else if (dates[i] === "> 2000") {
            return year > 2000;
          }
        });
        filterdData = tempData;
      }
    }
  }

  return [dateCount, filterdData];
}
