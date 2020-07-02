const tokenUtility = {
  clean: (authToken: string): string => {
    const tokenSplit = authToken.split(' ')
    return tokenSplit[tokenSplit.length - 1]
  },
}

export { tokenUtility }
