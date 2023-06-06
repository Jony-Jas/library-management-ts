const filterSubject = document.querySelector(
  "#filter-subject"
)! as HTMLDivElement;

interface booksInterface {
  BookID: number;
  image: string;
  Title: string;
  Author: string;
  Subject: string;
  Year: string;
}

export function displaySubject(getSubjectNames: Set<string>) {
  if (filterSubject.innerHTML === "") {
    for (let subject of getSubjectNames) {
      let option = document.createElement("input");
      option.type = "checkbox";
      option.value = subject;
      option.name = subject;

      let label = document.createElement("label");
      label.innerText = subject;
      label.setAttribute("for", subject);

      filterSubject.appendChild(option);
      filterSubject.appendChild(label);
      filterSubject.appendChild(document.createElement("br"));
    }
  }
}

export function filterBySubject(
  filterdData: booksInterface[],
  books: booksInterface[]
): [number, booksInterface[]] {
  const subjects: string[] = [];
  let subjectCount = 0;
  for (let i = 0; i < filterSubject.children.length; i++) {
    const element = filterSubject.children[i] as HTMLInputElement;
    if (element.checked) {
      subjects.push(element.value);
      subjectCount++;
    }
  }

  if (subjectCount !== 0) {
    if (filterdData.length === 0) {
      filterdData = books.filter((book) => {
        return subjects.includes(book.Subject);
      });
    } else {
      filterdData = filterdData.filter((book) => {
        return subjects.includes(book.Subject);
      });
    }
  }

  return [subjectCount, filterdData];
}
