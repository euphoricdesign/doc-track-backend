export enum AppointmentStatus { // variables/constantes
    Active = "active",
    Cancelled = "cancelled"
}

interface IAppointment {
    id: number;
    date: string;
    time: string;
    userId: number;
    status: AppointmentStatus; // Esto define un tipo de cadena literal
}


export default IAppointment