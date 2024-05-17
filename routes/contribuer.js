function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

export function post(request, response) {
  const { nom, description, score, adresse } = request.body;
  const photo = request.file ? request.file.filename : '';

  if (
    !isNonEmptyString(nom) ||
    !isNonEmptyString(description) ||
    !isNonEmptyString(score) ||
    !isNonEmptyString(adresse)
  ) {
    response.status(400).json({ message: "All fields must be filled out." });
    return;
  }

  // You can add more validation here if needed

  response.status(200).json({ nom });
}
