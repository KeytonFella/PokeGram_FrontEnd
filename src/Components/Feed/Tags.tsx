import './Tags.scss'; 

export interface Tag{
    value: string;
    label: string
}
interface tagProps{
    tags: Tag[] ;
}
const Tags: React.FC<tagProps> = ({tags}) => {
    return (
        <div className="tags-container">
            {tags.map((tag, index) => (
                <div key={index} className="tag_div">
                    {tag.label}
                </div>
            ))}
        </div>
    )
}
export default Tags;
