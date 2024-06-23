import { Box, Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <Box as="div" key={i} className="m-4">
          <Skeleton height="200px" />
          <Skeleton mt="4" height="20px" />
          <Skeleton mt="4" height="20px" />
        </Box>
      ))}
    </>
  );
}
