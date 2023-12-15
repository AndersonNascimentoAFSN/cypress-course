import Link from "next/link"

export default function NavItem({ label, path, ...rest }) {
  return (
    <Link href={path} {...rest}>
      {label}
    </Link>
  )
}