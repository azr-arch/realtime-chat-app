const MessageInput = ({ value, onChange, onSubmit }) => {
  return (
    <div className="w-full max-w-lg rounded-sm grow flex items-center gap-5 overflow-hidden">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="grow h-full py-2 px-2"
        placeholder="Message"
      />

      <button
        onClick={onSubmit}
        className="hover:bg-black hover:text-white p-3"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
