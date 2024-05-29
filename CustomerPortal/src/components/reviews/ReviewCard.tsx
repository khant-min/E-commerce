import { Box, Text } from "@chakra-ui/react";

interface Props {
  userName: string;
  date: string;
  rating: number;
  reviewContent: string;
}

const ReviewCard = ({ userName, date, rating, reviewContent }: Props) => {
  return (
    <Box className="flex flex-col items-start justify-center gap-3 w-full bg-slate-100 p-4 rounded-xl">
      <Text fontSize={"lg"} as={"b"}>
        {userName}
      </Text>
      <Box className="flex justify-between items-center w-full">
        <Text>{date}</Text>
        {/* we need to think of the logic; how to show star UI based on decimal value from DB*/}
        <Text>{rating}</Text>
      </Box>
      <Text className="mt-2">{reviewContent}</Text>
    </Box>
  );
};

export default ReviewCard;
