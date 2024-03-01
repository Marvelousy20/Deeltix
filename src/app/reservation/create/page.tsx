import { Breadcrumbs } from "@/components/Dashboard/GetStarted/Breadcrumb";
import CreateReservations from "@/components/Dashboard/Reservation/CreateReservation";
export default function createReservations() {
  return (
    <div className="p-4">
      <div>
        <Breadcrumbs
          breadcrumb="Book Reservation"
          firstText="Reservation"
          action="Confirm Reservation"
          link="/reservation"
        />
      </div>

      <CreateReservations />
    </div>
  );
}
