/** @format */

import { styled } from "@/src/theme";
import { lighten } from "@/src/theme/styled";

export default styled()(({ theme }) => ({
  wrapperNotifications: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.pallet.primary.background,
    paddingHorizontal: 10,
    paddingTop: 15
  },
  cardNotification: {
    padding: 15,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  cardIconNotification: {
    marginRight: 15,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  cardTextNotification: {
    flex: 1
  }
}));
