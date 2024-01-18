import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, TreeItemProps, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import ComputerIcon from '@mui/icons-material/Computer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import LanIcon from '@mui/icons-material/Lan';


declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    bgColorForDarkMode?: string;
    color?: string;
    colorForDarkMode?: string;
    labelIcon: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
})) as unknown as typeof TreeItem;

const StyledTreeItem = React.forwardRef(function StyledTreeItem(
    props: StyledTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
) {
    const theme = useTheme();
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        colorForDarkMode,
        bgColorForDarkMode,
        ...other
    } = props;

    const styleProps = {
        '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
        '--tree-view-bg-color':
            theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
    };

    return (
        <StyledTreeItemRoot
            label={
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 0.5,
                        pr: 0,
                    }}
                >
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={styleProps}
            {...other}
            ref={ref}
        />
    );
});

const color = "#3c8039"
const bgColor = "#e6f4ea"
export default function ExperienceTreeView() {
    return (
        <TreeView
            aria-label="gmail"
            defaultExpanded={['3']}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{ height: '100vh', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            <StyledTreeItem
                onClick={() => { console.log('you clicked on work') }}
                nodeId="3"
                labelText="Work"
                color={color}
                bgColor={bgColor}
                labelIcon={WorkIcon}
            >
                <StyledTreeItem
                    nodeId="5"
                    labelText="Social"
                    labelIcon={SupervisorAccountIcon}
                    labelInfo="90"
                    color={color}
                    bgColor={bgColor}
                    colorForDarkMode="#B8E7FB"
                    bgColorForDarkMode="#071318"
                />
                <StyledTreeItem
                    nodeId="6"
                    labelText="Updates"
                    labelIcon={InfoIcon}
                    labelInfo="2,294"
                    color={color}
                    bgColor={bgColor}
                    colorForDarkMode="#FFE2B7"
                    bgColorForDarkMode="#191207"
                />
                <StyledTreeItem
                    nodeId="7"
                    labelText="Forums"
                    labelIcon={ForumIcon}
                    labelInfo="3,566"
                    color={color}
                    bgColor={bgColor}
                    colorForDarkMode="#D9B8FB"
                    bgColorForDarkMode="#100719"
                />
                <StyledTreeItem
                    nodeId="8"
                    labelText="Promotions"
                    labelIcon={LocalOfferIcon}
                    labelInfo="733"
                    color={color}
                    bgColor={bgColor}
                    colorForDarkMode="#CCE8CD"
                    bgColorForDarkMode="#0C130D"
                />
            </StyledTreeItem>
            <StyledTreeItem
                onClick={() => { console.log('you clicked on education') }}
                nodeId="4"
                labelText="Education"
                labelInfo='3'
                color={color}
                bgColor={bgColor}
                labelIcon={SchoolIcon}
            >
                <StyledTreeItem
                    onClick={() => { console.log('you clicked on cs') }}
                    nodeId="9"
                    labelText="Computer Science"
                    color={color}
                    bgColor={bgColor}
                    labelInfo='2'
                    labelIcon={ComputerIcon}
                >
                    <StyledTreeItem
                        onClick={() => { console.log('you clicked on bachelors') }}
                        nodeId="11"
                        labelText="Bachelors"
                        color={color}
                        bgColor={bgColor}
                        labelIcon={DeveloperBoardIcon}
                    />
                    <StyledTreeItem
                        onClick={() => { console.log('you clicked on masters') }}
                        nodeId="12"
                        labelText="Masters"
                        color={color}
                        bgColor={bgColor}
                        labelIcon={LanIcon}
                    />
                </StyledTreeItem>
                <StyledTreeItem
                    onClick={() => { console.log('you clicked on psych') }}
                    nodeId="10"
                    labelText="Psychology"
                    color={color}
                    bgColor={bgColor}
                    labelIcon={PsychologyIcon}
                />
            </StyledTreeItem>



        </TreeView >
    );
}