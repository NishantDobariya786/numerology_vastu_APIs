function getLimitAndSkip(pageNo: number) {
  const limit = 12;
  const skip = (pageNo - 1) * limit;
  return { limit, skip };
}

export { getLimitAndSkip };
