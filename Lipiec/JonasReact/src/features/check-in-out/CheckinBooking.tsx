import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import { Row } from "../../ui/Row";
import { Heading } from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import { Button } from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { bookingID } = useParams();
  const { data: booking, isLoading } = useBooking(bookingID);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { checkin, isChecking } = useCheckin(bookingID);

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking?.isPaid]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;

    checkin();
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingID}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          id="confirm"
          disabled={confirmPaid || isChecking}
          onChange={() => setConfirmPaid((prev) => !prev)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>
          Check in booking #{bookingID}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
