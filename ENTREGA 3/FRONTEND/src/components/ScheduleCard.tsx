type ScheduleCardProps = {
  image: string;
  title: string;
  date: string;
  location: string;
};

export default function ScheduleCard({ image, title, date, location }: ScheduleCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3 flex gap-3">
      <img src={image} className="w-16 h-16 rounded-xl object-cover" />

      <div className="flex flex-col">
        <div className="text-xs text-gray-500">{date}</div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-gray-500">{location}</div>
      </div>
    </div>
  );
}
