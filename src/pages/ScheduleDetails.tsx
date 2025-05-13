import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom";

const scheduleData = [
  { train: "Alpha B16", origin: "Offa", destination: "Ilorin", time: "9:00am", day: "Monday", classes: "1st, 2nd, 3rd" },
  { train: "Zeus 014", origin: "Offa", destination: "Kano", time: "4:00pm", day: "Wednesday", classes: "1st, 2nd, 3rd" },
  { train: "MEG 112", origin: "Offa", destination: "Lagos", time: "6:00pm", day: "Saturday", classes: "1st, 2nd, 3rd" },
  { train: "MEG 112", origin: "Offa", destination: "Ibadan", time: "6:00pm", day: "Saturday", classes: "1st, 2nd, 3rd" },
  { train: "MEG 112", origin: "Offa", destination: "Abuja", time: "6:00pm", day: "Saturday", classes: "1st, 2nd, 3rd" },
  { train: "Alpha B16", origin: "Offa", destination: "Kaduna", time: "9:00am", day: "Thursday", classes: "1st, 2nd, 3rd" },
  { train: "Zeus 014", origin: "Offa", destination: "Warri", time: "5:00pm", day: "Sunday", classes: "1st, 2nd, 3rd" },
]

export default function ScheduleDetails() {

  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md" onClick={() => navigate('/')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span>Go back</span>
        </button>
        <h1 className="text-2xl font-bold">Train Schedule</h1>
      </div>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Train Name</TableHead>
          <TableHead>Origin</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Departure Time</TableHead>
          <TableHead>Day</TableHead>
          <TableHead>Class</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scheduleData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.train}</TableCell>
            <TableCell>{item.origin}</TableCell>
            <TableCell>{item.destination}</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell>{item.day}</TableCell>
            <TableCell>{item.classes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
