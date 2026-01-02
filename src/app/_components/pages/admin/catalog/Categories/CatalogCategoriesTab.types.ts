export interface SubServiceType {
  service_entry_id: number;
  sub_service_title: string;
  duration: number;
  price: number;
}

export interface GroupedServiceType {
  service_id: number;
  service_title: string;
  sub_services: SubServiceType[];
}
