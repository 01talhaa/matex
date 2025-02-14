import React from 'react';
import Link from 'next/link';

const Breadcrumb = ({ segments }) => {
  return (
    <nav className="text-sm">
      <ol className="flex items-center space-x-2">
        {segments.map((segment, index) => (
          <li key={index}>
            {index === segments.length - 1 ? (
              <span className="text-blue-600">{segment.label}</span>
            ) : (
              <>
                <Link href={segment.href} className="text-gray-500 hover:text-blue-600">
                  {segment.label}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;