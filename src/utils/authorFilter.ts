const filterAuthor = document.querySelector(
  "#filter-author"
)! as HTMLDivElement;

interface booksInterface {
  BookID: number;
  image: string;
  Title: string;
  Author: string;
  Subject: string;
  Year: string;
}

export function displayAuthor(getAuthorNames: Set<string>) {
  if (filterAuthor.innerHTML === "") {
    for (let author of getAuthorNames) {
      let option = document.createElement("input");
      option.type = "checkbox";
      option.value = author;
      option.name = author;

      let label = document.createElement("label");
      label.innerText = author;
      label.setAttribute("for", author);

      filterAuthor.appendChild(option);
      filterAuthor.appendChild(label);
      filterAuthor.appendChild(document.createElement("br"));
    }
  }
}

export function filterByAuthor(
  books: booksInterface[]
): [number, booksInterface[]] {
  const filterd: string[] = [];
  let authorCount = 0;
  for (let i = 0; i < filterAuthor.children.length; i++) {
    const ele = filterAuthor.children[i] as HTMLInputElement;
    if (ele.checked) {
      authorCount++;
      filterd.push(ele.value);
    }
  }
  let filterdData = books.filter((book) => {
    return filterd.includes(book.Author);
  });

  return [authorCount, filterdData];
}
