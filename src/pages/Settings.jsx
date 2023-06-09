import { NavLink, Outlet } from 'react-router-dom';
import { settingsLinks } from '../utils/localData';
import Wrapper from '../styled/Settings';

const Settings = () => {
    return (
        <Wrapper>
            <aside className='sidebar'>
                {settingsLinks.map(({ id, icon, name, path }) => (
                    <NavLink key={id} to={path} end>
                        {icon} {name}
                    </NavLink>
                ))}
            </aside>
            <div className='outlet'>
                <Outlet />
            </div>
        </Wrapper>
    );
};

export default Settings;
