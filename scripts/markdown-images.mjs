export function markdownImages(value) {
  const references = new Map([...value.matchAll(/^\s{0,3}\[([^\]]+)\]:\s*<?([^\s>]+)/gm)]
    .map(match => [match[1].trim().toLowerCase(), match[2]]));
  const paths = [...value.matchAll(/!\[[^\]]*\]\(<?([^\s)>]+)/g)].map(match => match[1]);
  for (const match of value.matchAll(/!\[([^\]]+)\](?:\[([^\]]*)\])?(?![\[(])/g)) {
    const destination = references.get((match[2] || match[1]).trim().toLowerCase());
    if (destination) paths.push(destination);
  }
  return paths;
}
