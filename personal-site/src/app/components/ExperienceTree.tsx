'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
import { experience } from './Experience'


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
interface ETVProps {
    setExperience: any,
    setHeader: any,
}
export default function ExperienceTreeView({ setExperience, setHeader }: ETVProps) {
    return (
        <TreeView
            aria-label="gmail"
            defaultExpanded={['0']}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{ height: '100vh', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            <StyledTreeItem
                onClick={() => {
                    setHeader(experience.work.description);
                    setExperience({})
                }}
                nodeId="3"
                labelText="Work"
                color={color}
                bgColor={bgColor}
                labelIcon={WorkIcon}
            >
                <StyledTreeItem
                    onClick={() => {
                        setHeader("");
                        setExperience(experience.work["United Health Care"]);
                    }}
                    nodeId="5"
                    labelText={experience.work["United Health Care"].Company}
                    labelIcon={SupervisorAccountIcon}
                    labelInfo={experience.work["United Health Care"].Date}
                    color={color}
                    bgColor={bgColor}
                    colorForDarkMode="#B8E7FB"
                    bgColorForDarkMode="#071318"
                />
                <StyledTreeItem
                    nodeId="6"
                    onClick={() => {
                        setHeader("");
                        setExperience(experience.work["OpenEye Scientific Software"]);
                    }}
                    labelText={experience.work["OpenEye Scientific Software"].Company}
                    labelIcon={InfoIcon}
                    labelInfo={experience.work["OpenEye Scientific Software"].Date}
                    color={color}
                    bgColor={bgColor}
                    colorForDarkMode="#FFE2B7"
                    bgColorForDarkMode="#191207"
                />
                <StyledTreeItem
                    nodeId="7"
                    onClick={() => {
                        setHeader("");
                        setExperience(experience.work["UNM"]);
                    }}
                    labelText={experience.work["UNM"].Company}
                    labelIcon={ForumIcon}
                    labelInfo={experience.work["UNM"].Date}
                    color={color}
                    bgColor={bgColor}
                    colorForDarkMode="#D9B8FB"
                    bgColorForDarkMode="#100719"
                />
            </StyledTreeItem>
            <StyledTreeItem
                onClick={() => {
                    setHeader(experience.school.description);
                    setExperience({});
                }}
                nodeId="4"
                labelText="Education"
                labelInfo='3'
                color={color}
                bgColor={bgColor}
                labelIcon={SchoolIcon}
            >
                <StyledTreeItem
                    onClick={() => {
                        setHeader(experience.school.computer.description);
                        setExperience({});
                    }}
                    nodeId="9"
                    labelText="Computer Science"
                    color={color}
                    bgColor={bgColor}
                    labelInfo='2'
                    labelIcon={ComputerIcon}
                >
                    <StyledTreeItem
                        onClick={() => {
                            setHeader("");
                            setExperience(experience.school.computer.bachelors);
                        }}
                        nodeId="11"
                        labelText={experience.school.computer.bachelors.Degree}
                        labelInfo={experience.school.computer.bachelors.Date}
                        color={color}
                        bgColor={bgColor}
                        labelIcon={DeveloperBoardIcon}
                    />
                    <StyledTreeItem
                        onClick={() => {
                            setHeader("");
                            setExperience(experience.school.computer.masters);
                        }}
                        nodeId="12"
                        labelText={experience.school.computer.masters.Degree}
                        labelInfo={experience.school.computer.masters.Date}
                        color={color}
                        bgColor={bgColor}
                        labelIcon={LanIcon}
                    />
                </StyledTreeItem>
                <StyledTreeItem
                    onClick={() => {
                        setHeader("");
                        setExperience(experience.school.psychology.bachelors);
                    }}
                    nodeId="10"
                    labelText={experience.school.psychology.bachelors.Degree}
                    labelInfo={experience.school.psychology.bachelors.Date}
                    color={color}
                    bgColor={bgColor}
                    labelIcon={PsychologyIcon}
                />
            </StyledTreeItem>
        </TreeView >
    );
}