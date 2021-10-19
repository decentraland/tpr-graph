export function getCollectionId(id: string): string | null {
  let values = id.split(":");

  if (values.length != 6) {
    return null;
  }

  return values[4];
}

export function getItemId(id: string): string | null {
  let values = id.split(":");

  if (values.length != 6) {
    return null;
  }

  return values[5];
}
