import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { MoreHorizontal } from "lucide-react";

function ModalDetails({ id }: any) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        id={id}
        opened={opened}
        onClose={close}
        title="Authentication"
        centered
      >
        <h3>Guest Details</h3>
      </Modal>

      <Group position="center">
        <MoreHorizontal onClick={open} />
      </Group>
    </>
  );
}

export default ModalDetails;
