import GitHubIcon from '../common/GitHubIcon';

const Header = () => {
  return (
    <header className="w-full bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-white">Task Board</h1>
        </div>

        <nav className="flex items-center space-x-4">
          <a
            href="https://github.com/DaniBencz/trello-clone"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <GitHubIcon width={24} height={24} className="text-current" />
            <span>View on GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;