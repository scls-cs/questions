// src/app/page.tsx
import Link from 'next/link';
import { questions } from './questions/data';
//import Cookies from 'js-cookie';

export default function Home() {
  const statusColors = {
    correct: 'bg-green-500',
    wrong: 'bg-red-500',
    pending: 'bg-gray-400'
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Question</th>
            <th className="p-2 border">Unit</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id} >
              <td className="p-2 border">
                <div 
                  className={`w-4 h-4 rounded-full ${statusColors[question.status]}`}
                  title={question.status}
                />
              </td>
              <td className="p-2 border">
                <Link 
                  href={`/questions?name=${encodeURIComponent(question.name.toLowerCase())}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {question.name}
                </Link>
              </td>
              <td className="p-2 border">
                {question.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}