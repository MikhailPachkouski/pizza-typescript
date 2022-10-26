import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="134" cy="129" r="130" />
        <rect x="-2" y="276" rx="10" ry="10" width="280" height="29" />
        <rect x="0" y="317" rx="10" ry="10" width="280" height="80" />
        <rect x="6" y="413" rx="10" ry="10" width="95" height="45" />
        <rect x="127" y="412" rx="22" ry="22" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton
