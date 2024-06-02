export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="flex justify-end m-4 mt-20">
      <h4>&#169;{date} E-commerce. All Rights Reserved.</h4>
    </div>
  );
}
