
function isNonEmptyString(value) {
  return typeof value === "string" && value !== "";
}

export function post(request, response) {
  const { username, password, name } = request.body;
  if (
    !isNonEmptyString(nom) ||
    !isNonEmptyString(description) ||
    !isNonEmptyString(score)||
    !isNonEmptyString(adresse)||
    !isNonEmptyString(photo) 
  ) {
    response.status(400).end();
    return;
  }

}