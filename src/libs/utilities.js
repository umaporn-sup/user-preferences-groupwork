function sortBySection(items) {
  console.log('sorting...')
  items.sort((a, b) => a.section - b.section)
}

function getLastPage(items, rowsPerPage) {
  return Math.ceil(items.length / rowsPerPage)
}

function getRowsInPage(items, rowsPerPage, currentPage = 1) {
  // slice(firstIndex, lastIndex-1)
  return items.slice((currentPage - 1) * rowsPerPage, rowsPerPage * currentPage)
}

function searchByKeyword(items, keywords) {
  console.log('search...')
  const lowerCaseKeywords = keywords.toLowerCase()
  return items.filter(
    (item) =>
      item.section.toString().includes(lowerCaseKeywords) ||
      item.groupName.toLowerCase().includes(lowerCaseKeywords) ||
      item.repo.toLowerCase().includes(lowerCaseKeywords) ||
      item.members.some(
        (member) =>
          member.studentId.toString().includes(lowerCaseKeywords) ||
          member.studentName.toLowerCase().includes(lowerCaseKeywords)
      )
  )
}
export { sortBySection, getLastPage, getRowsInPage, searchByKeyword }
