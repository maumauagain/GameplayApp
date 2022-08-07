import { AppointmentProps } from "../components/Appointment";

export type RootStackParamList = {
    SignIn: undefined;
    Home: undefined;
    AppointmentDetails: AppointmentProps;
    AppointmentCreate: undefined;
}
