
export enum MenuNames {
    Rock = 'Rock',
    Water = 'Water',
    House = 'House'
}
type MenuItemProps = {
    onClick: () => void;
    menuName: MenuNames;
    selectedClass?: string;
}


const MenuItem = ({ onClick, menuName, selectedClass }: MenuItemProps) => {
    let menuItemClasses = `h-16 w-32 p-4 border-4 ${selectedClass}`

    switch (menuName) {
        case MenuNames.Rock:
            menuItemClasses += ' bg-gray-400'
            break;
        case MenuNames.Water:
            menuItemClasses += ' bg-blue-300'
            break;
        case MenuNames.House:
            menuItemClasses += ' bg-black'
            break;
    }

    return (
        <div className="flex-col">
            <div className={menuItemClasses} onClick={onClick} />
            <h6 className="inline-flex items-center mt-3 font-title">
                {menuName}
            </h6>

        </div>
    )
}

export default MenuItem;